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

#### Async

#### Jar

##### JSONAsync

##### HTMLAsync

##### FormAsync

### Resources
