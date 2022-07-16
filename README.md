<div id="top"></div>
<br />
<div align="center">
  <a href="https://eartho.world">
    <img src="https://user-images.githubusercontent.com/99670283/172473537-5b4005cf-979b-45cf-bc8a-0f74fb6842e5.png" alt="Logo" width="128" height="128">
  </a>

  <h1 align="center">Eartho. One</h1>

  <p align="center">
    One line of code to authenticate users via<br /><b>Any social network, metamask and phone authentication</b><br /><br />
You don't need to read the documents of all companies and you don't need to open accounts there.<br />
We are a third layer that abstracts the complexity for you and protects your users from being tracked.<br /><br />
You can easily keep your backend solution - self server / firebase / amplify , or get a nocode solution from us.<br /><br />
    <a href="https://www.eartho.world/product/learn"><strong>Quick Start »</strong></a>
    <br />
    <br />
    <a href="https://eartho.world">Our Website</a>
    ·
    <a href="https://github.com/eartho-group/one-client-js/issues">Report Bug</a>
    ·
    <a href="https://github.com/eartho-group/one-client-js/issues">Request Feature</a>
    ·
    <a href="https://discord.gg/5QbuTNTG2q">Discord</a>
  </p>
 <br />
<img src="https://user-images.githubusercontent.com/99670283/176105926-c9f0b25a-01de-45a1-97a6-2f93dbb4d81c.png">
</div>


<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
<br />
    <img src="https://user-images.githubusercontent.com/99670283/178576414-ac74ae1f-c072-4ea2-81e4-a0b758d5256d.gif" alt="Logo" height="300" />
<br /><br /><br />
Get all integrations at once. No extra steps.
From improving customer experience through seamless sign-on to making auth as easy as a click of a button – your login box must find the right balance between user convenience, privacy and security.


Here's why:

* Ready high converting UI/UX
* Login from Google, Twitter, Github, Facebook, Apple, Microsoft at once with not extra steps or
  extra effort.
* Your users will be protected under our third layer, we prevent from companies to track after your
  users.
* Advanced analytics and info about your app from all sources. ready for use. no extra steps
* No-Code / Your own server. you decide. We support all, your own server, our server, firebase auth
  and many more.

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

Using npm:

```sh
npm install @eartho/one-client-angular
```

We also have `ng-add` support, so the library can also be installed using the Angular CLI:

```sh
ng add @eartho/one-client-angular
```

### Register the authentication module

Install the SDK into your application by importing `AuthModule` and configuring with your Eartho client ID:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AuthModule } from '@eartho/one-client-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Import the module into the application, with configuration
    AuthModule.forRoot({
      clientId: 'YOUR_EARTHO_CLIENT_ID',
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Add login to your application

Next, inject the `AuthService` service into a component where you intend to provide the functionality to log in, by adding the `AuthService` type to your constructor. Then, provide a `connectW{access_id:'YOUR_EARTHO_ACCESS_ID'})` method and call `this.auth.connectWithRedirect({access_id:'YOUR_EARTHO_ACCESS_ID'})` to log the user into the application.

```js
import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@eartho/one-client-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My App';

  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {}

  connectWithRedirect(accessId:string): void {
    // Call this to redirect the user to the login page
    this.auth.connectWithRedirect({access_id:accessId});
  }
}
```

By default the application will ask Eartho will redirect back to the root URL of your application after authentication.
On your template, provide a button that will allow the user to log in to the application. Use the `isConnected$` observable to check that the user is not already authenticated:

```html
<button
  *ngIf="(auth.isConnected$ | async) === false"
  (click)="connectWithRedirect({access_id:'YOUR_EARTHO_ACCESS_ID'})"
>
  Log in
</button>
```

### Add logout to your application

Add a `logout` method to your component and call the SDK's `logout` method:

```js
logout(): void {
  // Call this to log the user out of the application
  this.auth.logout({ returnTo: window.location.origin });
}
```

Then on your component's template, add a button that will log the user out of the application. Use the `isConnected$` observable to check that the user has already been authenticated:

```html
<button *ngIf="auth.isConnected$ | async" (click)="logout()">
  Log out
</button>
```

### Display the user profile

Access the `user$` observable on the `AuthService` instance to retrieve the user profile. This observable already heeds the `isConnected$` observable, so you do not need to check if the user is authenticated before using it:

```html
<ul *ngIf="auth.user$ | async as user">
  <li>{{ user.displayName }}</li>
  <li>{{ user.email }}</li>
</ul>
```

### Access ID token claims

Access the `idTokenClaims$` observable on the `AuthService` instance to retrieve the ID token claims. Like the `user$` observable, this observable already heeds the `isConnected$` observable, so you do not need to check if the user is authenticated before using it:

```js
authService.idTokenClaims$.subscribe((claims) => console.log(claims));
```

### Handle errors

Errors in the login flow can be captured by subscribing to the `error$` observable:

```js
authService.error$.subscribe((error) => console.log(error));
```

### Protect a route

To ensure that a route can only be visited by authenticated users, add the built-in `AuthGuard` type to the `canActivate` property on the route you wish to protect.

If an unauthenticated user tries to access this route, they will first be redirected to Eartho to log in before returning to the URL they tried to get to before login:

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './unprotected/unprotected.component';
import { ProtectedComponent } from './protected/protected.component';

// Import the authentication guard
import { AuthGuard } from '@eartho/one-client-angular';

const routes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,

    // Protect a route by registering the auth guard in the `canActivate` hook
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### Call an API

The SDK provides an `HttpInterceptor` that automatically attaches access tokens to outgoing requests when using the built-in `HttpClient`. However, you must provide configuration that tells the interceptor which requests to attach access tokens to.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import the module from the SDK
import { AuthModule } from '@eartho/one-client-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Import the module into the application, with configuration
    AuthModule.forRoot({
      clientId: 'YOUR_EARTHO_CLIENT_ID',
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Register AuthHttpInterceptor

First, register the interceptor with your application module, along with the `HttpClientModule`.

**Note:** We do not do this automatically for you as we want you to be explicit about including this interceptor. Also, you may want to chain this interceptor with others, making it hard for us to place it accurately.

```js
// Import the interceptor module and the Angular types you'll need
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@eartho/one-client-angular';

// Register the interceptor with your app module in the `providers` array
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,     // Register this so that you can make API calls using HttpClient
    AppRoutingModule,
    AuthModule.forRoot(...),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
```

#### Configure AuthHttpInterceptor to attach access tokens

Next, tell the SDK which requests to attach access tokens to in the SDK configuration. These are matched on the URL by using a string, a regex, or more complex object that also allows you to specify the configuration for fetching tokens by setting the `tokenOptions` property.

If an HTTP call is made using `HttpClient` and there is no match in this configuration for that URL, then the interceptor will simply be bypassed and the call will be executed without a token attached in the `Authorization` header.

**Note:** We do this to help prevent tokens being unintentionally attached to requests to the wrong recipient, which is a serious security issue. Those recipients could then use that token to call the API as if it were your application.

In the event that requests should be made available for both anonymous and authenticated users, the `allowAnonymous` property can be set to `true`. When omitted, or set to `false`, requests that match the configuration, will not be executed when there is no access token available.

Here are some examples:

```js
import { HttpMethod } from '@eartho/one-client-angular';

// Modify your existing SDK configuration to include the httpInterceptor config
AuthModule.forRoot({
  ...
  // The AuthHttpInterceptor configuration
  httpInterceptor: {
    allowedList: [
      // Attach access tokens to any calls to '/api' (exact match)
      '/api',

      // Attach access tokens to any calls that start with '/api/'
      '/api/*',

      // Match anything starting with /api/products, but also allow for anonymous users.
      {
        uri: '/api/products/*',
        allowAnonymous: true,
      },

      // access token must have
      {
        uri: '/api/accounts/*',
        tokenOptions: {
          access_id: 'access_id',
        },
      },

      // Matching on HTTP method
      {
        uri: '/api/orders',
        httpMethod: HttpMethod.Post,
        tokenOptions: {
          access_id: 'access_id',
        },
      },

      // Using an absolute URI
      {
        uri: 'https://one.eartho.world',
        tokenOptions: {
         
        },
      },
    ],
  },
});
```


**Uri Matching**

If you need more fine-grained control over the URI matching, you can provide a callback function to the `uriMatcher` property that takes a single `uri` argument (being [`HttpRequest.url`](https://angular.io/api/common/http/HttpRequest#url)) and returns a boolean. If this function returns true, then an access token is attached to the request in the ["Authorization" header](https://tools.ietf.org/html/draft-ietf-oauth-v2-bearer-20#section-2.1). If it returns false, the request proceeds without the access token attached.

```
AuthModule.forRoot({
  ...
  httpInterceptor: {
    allowedList: [
      {
        uriMatcher: (uri) => uri.indexOf('/api/orders') > -1,
        httpMethod: HttpMethod.Post,
        tokenOptions: {
          access_id: 'access_id',
        },
      },
    ],
  },
});
```

You might want to do this in scenarios where you need the token on multiple endpoints, but want to exclude it from only a few other endpoints. Instead of explicitly listing all endpoints that do need a token, a uriMatcher can be used to include all but the few endpoints that do not need a token attached to its requests.

#### Use HttpClient to make an API call

Finally, make your API call using the `HttpClient`. Access tokens are then attached automatically in the `Authorization` header:

```js
export class MyComponent {
  constructor(private http: HttpClient) {}

  callApi(): void {
    this.http.get('/api').subscribe(result => console.log(result));
  }
}
```

#### Handling errors

Whenever the SDK fails to retrieve an Access Token, either as part of the above interceptor or when manually calling `AuthService.connectSilently` and `AuthService.getAccessTokenWithPopup`, it will emit the corresponding error in the `AuthService.error$` observable.

If you want to interact to these errors, subscribe to the `error$` observable and act accordingly.

```
ngOnInit() {
  this.authService.error$.subscribe(error => {
    // Handle Error here
  });
}
```

A common reason you might want to handle the above errors, emitted by the `error$` observable, is to re-login the user when the SDK throws a `login_required` error.

```
ngOnInit() {
  this.authService.error$.pipe(
    filter((e) => e instanceof GenericError && e.error === 'login_required'),
    mergeMap(() => this.authService.connectWithRedirect({access_id:'YOUR_EARTHO_ACCESS_ID'}))
  ).subscribe();
}
```
