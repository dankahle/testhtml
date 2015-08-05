angular.module('dkGrid', [])
.directive('dkGrid', function() {
		return {
			scope: true,
			link: function ($scope) {
				if(!window.jQuery)
					throw new Error('dkGrid requires jquery')
				if(!window._)
					throw new Error('dkGrid requires lodash')


				var mode = $scope.mode = 'all';
				$scope.noResults = false;
				$scope.curPage = 0;
				$scope.pageSize = 5;
				$scope.addMode = $scope.editMode = false;
				var dkGridRepo = $scope.dkGridRepo,
					pageRangeSize = 4,
					numPages = $scope.numPages = 0,
					allItems = [],
					$trCurEdit, editItem,
					usingEditDlg = $scope.usingEditDlg = true,
					$trAddLink = $('.dk-table tr.add-link-row'),
					$trAddOrEdit = $('.dk-table tr.edit-row'),
					$editDlg = $('.dk-edit-dlg'),
					$editDlgBackdrop = $('.dk-edit-dlg-backdrop');

				$editDlgBackdrop.click(function(e) {
					return false;
				})

				function clearEditModes() {
					if($scope.editMode)
						$scope.cancelEdit();
					if($scope.addMode)
						$scope.cancelAdd();
				}

				function setFirstElemFocus() {
					if(usingEditDlg)
						$editDlg.find(':input:eq(0)').focus();
					else
						$trAddOrEdit.find(':input:eq(0)').focus();

				}

				$scope.showAdd = function() {
					clearEditModes();
					$scope.addMode = true;
					$scope.editItem = {};
					if(usingEditDlg) {
						$editDlg.show()
						$editDlgBackdrop.show()
					}
					else {
						$trAddLink.hide();
						$trAddOrEdit.show();
					}
					setFirstElemFocus();
				};

				$scope.remove = function($index, item) {
					dkGridRepo.remove(item).then(function() {
						if(mode == 'all')
							_.remove(allItems, item);
						getPage();
					})
				}

				$scope.showEdit = function(index, item) {
					clearEditModes();
					$scope.editMode = true;
					editItem = item;
					$scope.editItem = _.clone(editItem, true);
					if(usingEditDlg) {
						$editDlg.show()
						$editDlgBackdrop.show()
					}
					else {
						$trCurEdit = $('.dk-table tbody tr:nth-of-type(' + (index+1) + ')');
						$trAddOrEdit.show().insertAfter($trCurEdit.hide());
					}
					setFirstElemFocus();
				}

				$scope.cancelEdit = function() {
					if(usingEditDlg) {
						$editDlg.hide()
						$editDlgBackdrop.hide()
					}
					else {
						$('.dk-table tbody').append($trAddOrEdit.hide());
						$trCurEdit.show();
					}
					$scope.editMode = false;
				}

				$scope.update = function() {
					_.extend(editItem, $scope.editItem);// keep same object so it updates allItems as well
					dkGridRepo.update(editItem).then(function() {
						if(usingEditDlg) {
							$editDlg.hide()
							$editDlgBackdrop.hide()
						}
						else {
							$('.dk-table tbody').append($trAddOrEdit.hide());
							$trCurEdit.show();
						}
						$scope.editMode = false;
					}, function(err) {
						$scope.editMode = false;
					})
				}

				$scope.cancelAdd = function() {
					if(usingEditDlg) {
						$editDlg.hide()
						$editDlgBackdrop.hide()
					}
					else {
						$trAddOrEdit.hide();
						$trAddLink.show();
					}
					$scope.addMode = false;
				}

				$scope.add = function() {
					var newItem = $scope.editItem
					if(newItem.name) { // capitalize each word in name
						newItem.name = newItem.name.split(' ').map(function (v) {
							return v.charAt(0).toUpperCase() + v.slice(1);
						}).join(' ');
					}

					dkGridRepo.add(newItem).then(function(item) {
						if(mode == 'all') {
							allItems.push(item);
							if($scope.sortKey)
								allItems.sort(getSortFcn($scope.sortKey))
						}
						if(usingEditDlg) {
							$editDlg.hide()
							$editDlgBackdrop.hide()
						}
						else {
							$trAddOrEdit.hide();
							$trAddLink.show();
						}
						$scope.addMode = false;
						getPage();
					}, function(err) {
						$scope.addMode = false;
					})
				}

				$scope.toggleMode = function() {
					clearEditModes();
					mode == 'all'? mode = $scope.mode = 'page': mode = $scope.mode = 'all';
					refresh();
				};

				$scope.toggleUsingEditDlg = function() {
					clearEditModes();
					usingEditDlg = $scope.usingEditDlg = !usingEditDlg;
				};

				var setTableMinHeight = function() {
					var tableMinHeight;
					if($scope.noResults)
						tableMinHeight = 40 + 20 + 2; //margin+padding+border-top
					else
						tableMinHeight = ($scope.pageSize + 2) * 37 + 20;// rows + header/addrow * 37, 20 for table margin bottom

					$('.table-wrapper').css('min-height', tableMinHeight + 'px');
				}

				$scope.setPageRange = function(dir, changePage) {
					clearEditModes();
					var calcMaxPage = ($scope.curPage+1)*pageRangeSize;
					var nextMaxPage =  calcMaxPage > numPages? numPages: calcMaxPage;
					if(dir == 'init') {
						$scope.pages = _.range(0, nextMaxPage);
						return;
					}

					var minPage = 0,
						curStartPage = _.first($scope.pages),
						curEndPage = _.last($scope.pages);
					if(dir == 'dn' && curStartPage == minPage || dir == 'up' && curEndPage == numPages)
						return;
					if(dir == 'dn') {
						var newStart = curStartPage - pageRangeSize >=0? curStartPage - pageRangeSize: 0;
						var newEnd = newStart+pageRangeSize <= numPages? newStart+pageRangeSize: numPages;
//				console.log('prevrange', newStart, newEnd, $scope.curPage);
						$scope.pages = _.range(newStart, newEnd);
						if($scope.curPage < newStart || $scope.curPage > newEnd - 1) {
							$scope.curPage = newStart;
							getPage();
						}
					}
					else if(dir == 'up') {
						var newStart = curStartPage + pageRangeSize <= numPages - pageRangeSize? curStartPage + pageRangeSize: numPages - pageRangeSize;
						var newEnd = newStart+pageRangeSize <= numPages? newStart+pageRangeSize: numPages;
//				console.log('nextrange', newStart, newEnd, $scope.curPage);
						$scope.pages = _.range(newStart, newEnd);
						if($scope.curPage < newStart || $scope.curPage > newEnd - 1) {
							$scope.curPage = newStart;
							getPage();
						}
					}

				}

				var mapData = function (data) {
					return data.map(function(v,i) {
						if (v.bday)
							v.bday = new Date(v.bday);
						return v;
					})
				}

				var refresh = function() {
					clearEditModes();
					if(mode == 'all') {
						dkGridRepo.getAll().then(function (data) {
							allItems = mapData(data);

							if (allItems.length == 0) {
								$scope.noResults = true;
								setTableMinHeight();
							}
							else {
								$scope.noResults = false;
								setTableMinHeight();
								$scope.curPage = 0;
								$scope.sortKey = undefined;
								getPage();
								numPages = $scope.numPages = Math.ceil(allItems.length / $scope.pageSize);
								$scope.setPageRange('init');
							}
						});
					}
					else {
						getPage('init');
					}
				}

				var getTableInfoString = function(start, end, totalRecords) {
					return '' + (start + 1) + ' - ' + (end > totalRecords? totalRecords: end) + ' of ' + totalRecords;
				}

				var getPage = function(init) {
					var start = $scope.pageSize*$scope.curPage;
					var end = $scope.pageSize*($scope.curPage+1);
					if(mode == 'all') {
						$scope.items = allItems.slice(start, end);
						$scope.tableInfo = getTableInfoString(start, end, allItems.length);
					}
					else {
						if(init)
							$scope.sortKey = undefined;

						dkGridRepo.getPage($scope.curPage + 1, $scope.pageSize, $scope.sortKey)
							.then(function(data) {
							$scope.items = mapData(data.data);
							$scope.tableInfo = getTableInfoString(start, end, data.numRecords);

							if (data.numRecords == 0) {
								$scope.noResults = true;
								setTableMinHeight();
							}
							else {
								$scope.noResults = false;
								setTableMinHeight();
								if(init)
									$scope.curPage = 0;
								numPages = $scope.numPages = Math.ceil(data.numRecords / $scope.pageSize);
								if(init)
									$scope.setPageRange('init');
							}

						})
					}
				};

				var lastSortName, lastSortKey;
				$scope.sort = function (sortName) {
					clearEditModes();
					if (sortName == lastSortName) {
						if (lastSortKey.substr(-3) == '-up') {
							lastSortKey = sortName + '-dn';
							$scope.sortKey = lastSortKey;
						}
						else {
							lastSortKey = sortName + '-up';
							$scope.sortKey = lastSortKey;
						}
					}
					else {
						lastSortName = sortName;
						lastSortKey = sortName + '-up';
						$scope.sortKey = lastSortKey;
					}

					if(mode == 'all') {
						allItems.sort(getSortFcn($scope.sortKey))
						$scope.curPage = 0;
						getPage()
						$scope.setPageRange('init');
					}
					else {
						$scope.curPage = 0;
						getPage()
						$scope.setPageRange('init');
					}
				};

				$scope.isFirstPage = function() {
					return $scope.curPage == 0;
				}
				$scope.isLastPage = function() {
					return $scope.curPage == numPages - 1;
				}

				$scope.isFirstRange = function() {
					return _.first($scope.pages) == 0;
				}

				$scope.isLastRange = function() {
					return _.last($scope.pages) == numPages - 1;
				}

				$scope.prevPage = function(){
					clearEditModes();
					if($scope.isFirstPage())
						return;
					var lastCurPage = $scope.curPage;
					$scope.curPage--;
					if(lastCurPage == _.first($scope.pages))
						$scope.setPageRange('dn');
					getPage();
				}
				$scope.nextPage = function(){
					clearEditModes();
					if($scope.isLastPage())
						return;
					var lastCurPage = $scope.curPage;
					$scope.curPage++;// need to set before setPageRange so it can bump pages if needed
					if(lastCurPage == _.last($scope.pages))
						$scope.setPageRange('up');
					getPage();
				}
				$scope.setPage = function(page) {
					if($scope.curPage == page)
						return;
					$scope.curPage = page;
					getPage();
				}

				function getSortFcnType() {
					var keyName = $scope.sortKey.substring(0, $scope.sortKey.length - 3);
					if(keyName == 'bday')
						return 'date';
					else
						return '';
				}

				function getSortFcn(key) {
					var direction = key.substr(-2) == 'up' ? 'up' : 'dn';
					var prop = key.substring(0, key.length - 3);
					if (getSortFcnType(key) == 'date') {
						if (direction == 'up') {
							return function (a, b) {
								var ap = a['' + prop] ? a[prop].getTime() : 0;
								var bp = b[prop] ? b[prop].getTime() : 0;
								if (ap < bp) return -1;
								if (ap > bp) return 1;
								return 0;
							}
						}
						else {
							return function (a, b) {
								var ap = a['' + prop] ? a[prop].getTime() : 0;
								var bp = b[prop] ? b[prop].getTime() : 0;
								if (ap > bp) return -1;
								if (ap < bp) return 1;
								return 0;
							}
						}
					}
					else {
						if (direction == 'up') {
							return function (a, b) {
								var ap = a[prop];
								var bp = b[prop];
								ap = typeof(ap) == 'string'? ap.toLowerCase(): ap;
								bp = typeof(bp) == 'string'? bp.toLowerCase(): bp;
								if (ap < bp) return -1;
								if (ap > bp) return 1;
								return 0;
							}
						}
						else {
							return function (a, b) {
								var ap = a[prop];
								var bp = b[prop];
								ap = typeof(ap) == 'string'? ap.toLowerCase(): ap;
								bp = typeof(bp) == 'string'? bp.toLowerCase(): bp;
								if (ap > bp) return -1;
								if (ap < bp) return 1;
								return 0;
							}
						}
					}
				}

				refresh(); // fill grid

			}

		}
	});
