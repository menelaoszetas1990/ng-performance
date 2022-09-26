# Lazy Loading

<!-- TOC -->
* [Lazy Loading](#lazy-loading)
  * [Implementing Lazy Loading for a feature module](#implementing-lazy-loading-for-a-feature-module)
  * [Implementing Preloading](#implementing-preloading)
  * [Bonus: Use ngx-quicklink for smarter Preloading  *](#bonus--use-ngx-quicklink-for-smarter-preloading-)
  * [Bonus: Implementing a Custom Preloading Strategy **](#bonus--implementing-a-custom-preloading-strategy--)
<!-- TOC -->

In this lab we will further improve the initial load of our `flight-app` by using lazy loading. Of course, you could also apply the same optimizations to your own Apps if you prefer to do that.

## Implementing Lazy Loading for a feature module

Implement lazy loading for the `FlightBookingModule` in your `app.routes.ts`.
Keep in mind that lazy loading only works if the module in question isn't referenced directly but only with a string in the router configuration.

1. Open the file `app.module.ts` and remove the import for the `FlightBookingModule`.

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript
    @NgModule({
        imports: [
            [...]
            // FlightBookingModule,
            // ^^ Removed b/c this would prevent lazy loading
            [...]
        ],
        [...]        
    })
    export class AppModule {}
    ```

    </p>
    </details>

2. Since Angular 8, we are using EcmaScript inline imports for lazy loading. To make them work, you have to adjust your ``tsconfig.app.json`` (in ``flight-app``):

    - Here, make sure, ``module`` is set to ``esnext``.
    - This might also be set in the (included) root folder's ``tsconfig.base.json``.

3. Open the file `app.routes.ts` and introduce a route with the path `flight-booking`.
   It should point to the `FlightBookingModule` using `loadChildren`:

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript
    [...]
    {
        path: 'flight-booking',
        loadChildren: () => import('./flight-booking/flight-booking.module').then(m => m.FlightBookingModule)
    },
    {
        // This route needs to be the last one!
        path: '**',
        [...]
    }
    [...]
    ```

    </p>
    </details>

4. Make sure your sidebar link to flight-search and passenger-search still works (something like `routerLink="/flight-booking/flight-search"`).

5. Also make sure your `Edit` Button in your `FlightCardComponent` still works (try adding two dots like `[routerLink]="['../flight-edit', ...`).

6. Find out that webpack splits off an own chunk for the `FlightBookingModule` after implementing lazy loading.
   If this works, you will see another chunk at the console (e. g.  `flight-booking-flight-booking-module.js` depending on the used version of the CLI)

7. Try it out in the browser and use the network tab within the dev tools (F12) to make sure that it is only loaded on demand.
   If it doesn't work, have a look to the console tab within the dev tools.

## Implementing Preloading

In this exercise you will implement Preloading using Angular's `PreloadAllModules` strategy.

1. Open the file `app.module.ts` and register the `PreloadAllModules` strategy when calling `RouterModule.forRoot`.

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript
    @NgModule({
        imports: [
            [...],
            RouterModule.forRoot(
                APP_ROUTES,
                { preloadingStrategy: PreloadAllModules }
            ),
            [...]
        ],
        [...]        
    })
    export class AppModule {}
    ```

    </p>
    </details>

2. Make sure it works using the network tab within Chrome's dev tools. If it works, the lazy bundles are loaded **after** the app has been initializes. If this is the case, the chunks show up quite late in the water fall diagram.

## Bonus: Use ngx-quicklink for smarter Preloading  *

1. [Look at ngx-quicklink](https://www.npmjs.com/package/ngx-quicklink) on npmjs.com to get started with `ngx-quicklink`.

2. First you need to install `ngx-quicklink`:
   ```
   npm i ngx-quicklink
   ```

3. Now import the `QuicklinkModule` and replace the `PreloadAllModules` with the `QuicklinkStrategy`:

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript
    @NgModule({
        imports: [
            [...],
            QuicklinkModule,
            RouterModule.forRoot(
                APP_ROUTES,
                { preloadingStrategy: QuicklinkStrategy }
            ),
            [...]
        ],
        [...]        
    })
    export class AppModule {}
    ```

    </p>
    </details>

4. Make sure it still works using the network tab within Chrome's dev tools.

## Bonus: Implementing a Custom Preloading Strategy **

1. [Here](https://www.angulararchitects.io/aktuelles/performanceoptimierung/) you find some information about creating a custom preloading strategy. Have a look at it.

2. Create a custom preloading strategy that only preloads modules that have been marked with the `data` attribute in the router configuration.

3. Configure the system to make use of it and test it.
