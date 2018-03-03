# Panda Javascript Library

This is the panda main javascript library of services and helpers.

- [Libraries Used](#libraries-used)
- [Services](#services)
  - [Registry](#registry)
  - [Cache](#cache)
  - [Config](#config)
  - [Console](#console)
  - [Debug](#debug)
    - [Debugger](#debugger)
  - [Environment](#environment)
    - [Cookies](#cookies)
    - [Storage](#storage)
    - [Url](#url)
  - [Events](#events)
  - [Http](#http)
    - [Async](#async)
    - [Jar](#jar)
      - [JSONAsync](#jsonasync)
      - [HTMLAsync](#htmlasync)
      - [FormAsync](#formasync)
  - [Resources](#resources)

## Libraries Used

Panda Javascript Library is using **jQuery** for basic functionality, whenever is needed.

## Services

Panda Js is a library of different services that are combined together into a single file.

Different services have different namespaces, based on the behavior and logic.

An example if such library is **Cookies**:

```javascript
Panda.Env.Cookies.get('cookie_name');
```

This document will display the entire set of Services as they are distributed in different packages and namespaces.

### Registry

Cache is a simple service that uses key-value pairs to store temporarily information. All data are being stored
in runtime, which means that on page reload, all data are lost.

For storing data longer time, check the [Storage](#storage) service.

Usage:

```javascript
// Set a new object to registry:
Panda.Registry.set('object_name', 'object_value');

// Get the cached object and display it in the log:
var fromRegistry = Panda.Registry.get('object_name');
console.log(fromRegistry);

// Clear the entire registry, in case of system restart
// This function might be distrustful for other objects that rely on Registry as well 
Panda.Registry.clear();
```

### Cache

Cache is a simple service that uses key-value pairs to store temporarily information and data so that you can eliminate
network overload due to repeated requests and other processes.

Cache extends registry functionality.

Usage:

```javascript
// Set a new object to cache:
Panda.Cache.set('object_name', 'object_value');

// Get the cached object and display it in the log:
var fromCache = Panda.Cache.get('object_name');
console.log(fromCache);

// The service will return undefined if there is no cache-hit
var noCache = Panda.Cache.get('another_object');
if (noCache === undefined) {
    console.log('No object found.');
}

// Get the entire cache
var cache = Panda.Cache.getCache();
console.log(cache);
```

You can use this service to set a new cache completely. However, by default, set mechanism will extend the object.
If you need to replace it, you should clear it first.

```javascript
// Clear the entire cache (it doesn't affect other Registry entries)
Panda.Cache.clear();

// Set a new cache completely
var new_cache = {
    entry_1: 'Value 1'
};
Panda.Cache.setCache(new_cache);
```

### Config

Config is a similar to cache service which can be used for configuration objects.

Usage:

```javascript
// Set a new object to config:
Panda.Config.set('is_mobile', true);

// Use config to control the flow of your application
if (Panda.Config.get('is_mobile')) {
    console.log('Is in mobile');
}

// Get the entire config
var config = Panda.Config.getConfig();
console.log(config);
```

You can use this service to set a new config completely. However, by default, set mechanism will extend the object.
If you need to replace it, you should clear it first.

```javascript
// Clear the entire config (it doesn't affect other Registry entries)
Panda.Config.clear();

// Set a new cache completely
var new_config = {
    is_mobile: false,
    is_desktop: true
};
Panda.Config.setConfig(new_config);
```

### Console

Console is a basic wrapper of the browser's console object that allows the user to call basic Console functions.

The wrapper can be turned on or off during runtime to allow developers to keep logs in the code but turn them on or off
using cookies or the same service.

Console's status is based on 2 conditions using OR:
- Panda Debugger Status
- Panda Console Status

```javascript
// Normal usage of console
console.log('This is a test message');

// Check if Console is on
if (Panda.Console.status()) {
    // Console is on, do something
}

// The above if is redundant since this condition is checked in the Console itself
// The following message will be displayed only if the Console status is on
Panda.Console.log('This is a test message');
```

This wrapper supports basic output functions like `log()`, `dir()` and `dirxml()`:

```javascript
// Using console.log
Panda.Console.log('This is a test message');

// Using console.dir
Panda.Console.dir('This is a test message');

// Using console.dirxml
Panda.Console.dirxml('This is a test message');
```

### Debug

Debug is the basic namespace for providing Debug functionality and logic.

#### Debugger

Debugger is a service that provides basic functionality for turning on or off the Debugger mode in your application.

The Debugger status is determined based on 2 conditions:
- Panda Debug Status
- Cookie with the name `pdebug`

```javascript
// Activate debugger
Panda.Debug.Debugger.on();

// Deactivate debugger
Panda.Debug.Debugger.off();
```

You can control the flow of your application based on the Debugger mode. Common examples are
logging messages to the user using Console.

```javascript
if (Panda.Debug.Debugger.status()) {
    // We are on Debugger mode, do something special
}
```

### Environment

Environment is the basic namespace for providing Environment specific functionality and logic. This namespace
includes services regarding the browser environment and/or functionality.

#### Cookies

Cookies is a basic service of the Environment namespace which helps creating and reading cookies.

```javascript
// Store a new cookie which expires in 5 days
var expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 5);
Panda.Env.Cookies.set('cookie_name', 'cookie_value', expirationDate, '/');

// Store a new cookie which expires with the session,
// by setting null for the expiration date
Panda.Env.Cookies.set('cookie_name_session', 'cookie_value_session', null, '/');

// You can read any cookie by simply calling set()
var cookieValue = Panda.Env.Cookies.get('cookie_name');
console.log(cookieValue); // cookie_value
```

#### Storage

Storage service is a simple service which manages local and session storage.
Storage can be used in combination with Registry or Cache in order to store more permanently
values for later usage.

Storage can allow storing items to either localStorage or sessionStorage. You can control the type
of storage setting the `persistent` parameter to `true` or `false`.

For more information about the differences on local and session storage, you can see [here](https://www.w3schools.com/html/html5_webstorage.asp). 

```javascript
// Store a value to local storage
Panda.Env.Storage.set('item_name_local', 'item_value_local', true);
var localValue = Panda.Env.Storage.get('item_name_local', true);
console.log(localValue); // item_value_local

// Store a value to session storage
Panda.Env.Storage.set('item_name_session', 'item_value_session', false);
var sessionValue = Panda.Env.Storage.get('item_name_session', false);
console.log(sessionValue); // item_value_session
```

#### Url

Url is an Environment service which allows you to read the current url of a page and retrieve all
the information needed, including domain, sub-domain, paths and parameters.

```javascript
// Get current url's info (https://sub.domain.com/path/to/file
var info = Panda.Env.Url.info();
console.log(info); // {protocol: 'https', sub: 'sub', domain: 'domain.com', pathname: '/path/to/file', hash: ''}

// Get directly domain or sub-domain
var domain = Panda.Env.Url.getDomain();
console.log(domain); // 'domain.com'
var subDomain = Panda.Env.Url.getSubDomain();
console.log(subDomain); // 'sub'

// Use Url service to redirect or reload the page
Panda.Env.Url.reload(false);
Panda.Env.Url.redirect('https://sub2.domain.com/path/new/to/file');
``` 

### Events

Events is a basic service which acts as a facade for the basic event listener of jQuery.
Events can be used to easily attach event listeners to elements in a given context, with a given callback.

```javascript
// Attach a simple event
callbackFunction = function() {
    console.log('callback function')
};
Panda.Events.on('button', 'click', '', callbackFunction); // Equivalent to $(button).on('click', callbackFunction);
Panda.Events.one('button', 'click', '', callbackFunction); // Equivalent to $(button).one('click', callbackFunction); 
Panda.Events.off('button', 'click', ''); // Equivalent to $(button).off('click'); 
```

### Http

Http is a base Service that manages basic http requests and fast handling of responses, including Panda Jar Content Responses.

#### Async

Async Service by default extends the functionality that jQuery provides for ajax requests.
It returns a simple promise that can be handled in any way possible.

```javascript
(function ($) {
    var requestData = {};
    var sender = $(document);
    var extraOptions = {
        dataType: 'xml',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: true,
        cache: false
    };
    Panda.Http.Async.request('/path/to/resource', 'get', requestData, sender, extraOptions).then(function(response) {
        // Handle the response
        console.log(response);
    });
})(jQuery);
```

By default, each request has the following options set:
```javascript
var defaultOptions = {
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    processData: false,
    cache: true,
    crossDomain: true,
    loading: false,
    xhrFields: {
        withCredentials: false,
        requestId: requestId
    }
};
console.log(defaultOptions);
```

#### Jar

Json Asynchronous Response Service is a service that is capable of handling special responses generated by Panda's
[Jar package](https://github.com/PandaPlatform/jar).

In short description, Json Asynchronous Responses are responses with a specific structure that allow users to
deliver any content in any form from backend to frontend using json format.

##### JSONAsync

JSONAsync Service is the first service that handles all Jar responses. This service's responsibility is to detect events
or actions in the response's content and trigger them towards the sender of the request or the document.

To be able to detect and trigger these events, JSONAsync should be used for requests as follows:

```javascript
(function ($) {
    var requestData = {};
    var sender = $(document);
    var extraOptions = {};
    Panda.Http.Jar.JSONAsync.request('/path/to/resource', 'get', requestData, sender, extraOptions).then(function(response) {
        // At this point, events have been triggered already. 
        // The response contains both events and other data
        console.log(response);
    });
})(jQuery);
```

##### HTMLAsync

HTMLAsync Service is a different service that handles all Jar responses that contain html content. This service's
responsibility is to detect html contents in the response's content and distribute them based on their settings.

Each html content has the following attributes:
* `holder`: a normal css holder where the content should be placed.
* `method`: Determine whether to APPEND, PREPEND or REPLACE html to the holder
* `html`: The html content

For more information on the Jar's structure, see [Jar package](https://github.com/PandaPlatform/jar).

##### FormAsync

FormAsync Service is an extra service that handles forms that can submit content asynchronously.

The form can submit asynchronously on the given `action` parameter if it has async enabled.
You can enable async mode by adding attribute `data-async` in the form.

All form inputs are automatically collected and submitted according to w3c standards.

### Resources

Resources is a service that handle loading files like styles or scripts (javascript). It can also be used for normal
files like json.

Usage:
```javascript
// Load a normal file (json for example)
Panda.Resources.getResourceFile('/path/to/file.json', 'json');
```

Loading a javascript file can work with two ways:
* Asynchronously, add a script tag in head
* Promise-way, add a script tag in head

The difference between these two is that the latter will return a promise you can detect once it's finished.

Usage:
```javascript
// Load a javascript file asynchronously
Panda.Resources.loadJs('/path/to/script.js', function() {
    console.log('this is a callback, after the script is loaded');
});

// Use promise to load the javascript
Panda.Resources.loadJsInline('/path/to/script.js').then(function() {
    console.log('This callback will be fired once the promise is completed');
});
```

Like javascript, css can be loaded using the same two ways. The difference with javascript is that there is no
callback when loading asynchronously.

Usage:
```javascript
// Load a css file asynchronously
Panda.Resources.loadCss('/path/to/style.css');

// Use promise to load the css
Panda.Resources.loadCssInline('/path/to/style.css').then(function() {
    console.log('This callback will be fired once the promise is completed');
});
```
