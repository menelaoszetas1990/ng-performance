# Initial Load Performance

<!-- TOC -->
* [Initial Load Performance](#initial-load-performance)
  * [Improving Initial Load NgOptimizedImage](#improving-initial-load-ngoptimizedimage)
  * [Improving Initial Load with NG Prod Mode](#improving-initial-load-with-ng-prod-mode)
    * [Inspecting Bundles with webpack-bundle-analyzer](#inspecting-bundles-with-webpack-bundle-analyzer)
    * [Bonus: Inspecting source files with source-map-explorer](#bonus--inspecting-source-files-with-source-map-explorer)
  * [Avoid large 3rd party libs](#avoid-large-3rd-party-libs)
    * [Check your build for large parts of 3rd party code](#check-your-build-for-large-parts-of-3rd-party-code)
<!-- TOC -->

In this lab we will work with the Angular App of this repository / workspace. Of course, you could also apply the same optimizations to your own Apps if you prefer to do that.

## Improving Initial Load NgOptimizedImage

1. Check out the `HomeComponent` which is shown on our Apps front page.

   You can find some `<img>` tags in it. The first of them is above the fold, so it should be loaded eagerly, while the other two are below the fold, so we could use lazy loading on them.
2. To active image lazy loading we need to import the `NgOptimizedImage` directive to the `AppModule`:
   ```typescript
   @NgModule({
       imports: [
            [...],
            NgOptimizedImage
       ],
       [...]        
   })
   export class AppModule {}
   ```
   Also, make sure the corresponding import was added.
3. Now we just need to replace the images `src` attribute with the same `ngSrc` attribute (rename it from "src" to "ngSrc" without changing it\'s value).

### Bonus: Use a responsive image loading provider

A "loader" is a function that generates an image transformation URL for a given image file. When appropriate, `NgOptimizedImage` sets the size, format, and image quality transformations for an image.

`NgOptimizedImage` provides both a generic loader that applies no transformations, as well as loaders for various third-party image services. It also supports writing your own custom loader.

You can find the documentation here: [NgOptimizedImage image loaders](https://angular.io/guide/image-directive#configuring-an-image-loader-for-ngoptimizedimage).

1. For using `imagekit.io` as your image loader (of course you can choose another one) you have register (if you don't have access to an existing one) an account on https://imagekit.io/registration/.
2. After successful registration you can upload your images to the image provider of choice.
3. The next step is the register the provider in our `AppModule`:

   ```typescript
   @NgModule({
       [...],
       providers: [provideImageKitLoader('https://ik.imagekit.io/LXT')],
       [...]        
   })
   export class AppModule {}
   ```

   Make sure you've also imported the `provideImageKitLoader` from `@angular/common`.

4. Now we need to adjust the image `ngSrc` paths from the local asset path to the path on the image provider:

   ```html
      [...]
      <img width="2596" height="1890"
         ngSrc="grimming_from_glaeserkoppe.jpg"
         alt="Photo showing Grimming from the Gläserkoppe"
         priority />

      [...]
    ```

5. As the final optimization we can add the desired `ngSrcset` widths controlling the responsive image sizes (resolutions):

   ```html
      [...]
      <img width="2596" height="1890"
         ngSrc="grimming_from_glaeserkoppe.jpg"
         ngSrcset="320w, 640w, 1280w, 2596w"
         alt="Photo showing Grimming from the Gläserkoppe"
         priority />

      [...]
    ```
   
6. Test your solution.

## Improving Initial Load with NG Prod Mode

1. Make sure, your solution runs in debug mode (``ng serve -o``)
2. Open the performance tab in Chrome's dev tools and reload the app. Find out how long bootstrapping takes and create a screenshot.

   **Hint:** In order to respect the cache, do it twice and take the screenshot after the 2nd try.
3. Install the simple web server serve:
   ```
   npm install serve -g
   ```
4. Switch to the console and move to the root folder of your project. Create a production build:
   ```
   ng build
   ```
5. Start live-server for your production build. For this, switch to your project within the ``dist`` folder and call serve:
   ```
   serve -s
   ```
6. Open the performance tab in Chrome's dev tools and reload the app. Find out how long bootstrapping takes and create a screenshot.

   **Hint:** In order to respect the cache, do it twice and take the screenshot after the 2nd try.
7. Compare your screenshot with the performance results.

### Inspecting Bundles with webpack-bundle-analyzer

Using the webpack-bundle-analyzer one can have a look at a bundle's content. In this exercise you will use this possibility by inspecting your AOT-based and your AOT-less production build.

1. Install the `webpack-bundle-analyzer` globally (for the sake of simplicity):
   ```
   npm install -g webpack
   npm install -g webpack-bundle-analyzer
   ```
2. Move to the root folder of your project. Create a Production Build without AOT and generate a statistics file for the analyzer using the `stats-json` flag:
   ```
   ng build --aot=false --build-optimizer=false --stats-json
   ```
3. Analyze your bundles:
   ```
   cd dist/performance
   webpack-bundle-analyzer stats.json
   ```

   The name of ``stats.json`` can be slightly different on your machine, e. g. ``stats-es5.json`` or ``stats-es2015.json``.
4. Take a screen shot to document this.
5. Move to the root folder of your project. Create a production build using AOT:
   ```
   ng build --stats-json
   ```
6. Analyze these bundles too and compare it to the former bundles:
   ```
   cd dist/performance
   webpack-bundle-analyzer stats.json
   ```

### Bonus: Inspecting source files with source-map-explorer

Now let's try the `source-map-explorer` as an alternative to `webpack-bundle-analyzer`. With the `source-map-explorer` you look into single files instead of the bundle.
   ```
   npm i -g source-map-explorer
   ```
To be able to explore the .js files you need source maps to be enabled in your `angular.json`. Make sure you enable that for both, the development and the production build.

After enabling source maps and rebuilding the App open the main bundle (main.js) and explore it with the `source-map-explorer`.

Results tend to be more accurate here compared to the `webpack-bundle-analyzer`.

## Avoid large 3rd party libs

### Check your build for large parts of 3rd party code

You can either use `webpack-bundle-analyzer` or `source-map-explorer` for this task.

1. See if you can find a large import and if yes try to replace that.

2. Make sure the new 3rd party lib has **ES6 imports** and this is **tree-shakeable**.

3. Compare the production build size and check how much smaller your build has become.
