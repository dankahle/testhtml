##lazyload

so the deal is: you want to load modules on the fly, so that would include all things module, but not only that you want to load everything a directive needs on the fly and then instantiate that directive. The modules are easy and can be done via there service: @ocLazyLoad.load(). The directive requires using the oc-lazy-load directive and putting your directive inside theirs as such:

```html
// this array could be in controller instead
<div oc-lazy-load="[
   'lazyload/lazyload.css',
   'lazyload/lazyload.html',
   'lazyload/lazyload.js']">
   
   <ll-dir></ll-dir> <!-- create dynamic directive here -->
</div>
```
