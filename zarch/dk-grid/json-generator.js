[
	'{{repeat(27)}}',
	{
		name: '{{firstName()}}',
		age: '{{integer(20, 60)}}',
		sex: '{{random("M", "F")}}',
		bday: '{{moment(this.date(new Date(1955,0,1), new Date(1985,0,1))).format("L")}}',
		created: '{{date()}}',
		sport: '{{lorem(1, "words")}}'
	}

]