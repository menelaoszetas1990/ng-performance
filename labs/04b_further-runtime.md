# Further Runtime Performance

<!-- TOC -->
* [Runtime Performance](#runtime-performance)
  * [Optimization with Angular Pipes](#optimization-with-angular-pipes)
  * [Using *ngFor trackBy](#using--ngfor-trackby)
  * [Using Virtual Scrolling](#using-virtual-scrolling)
  * [Bonus: Unsubscribing RxJS subscriptions](#bonus--unsubscribing-rxjs-subscriptions)
<!-- TOC -->

## Optimization with Angular Pipes

1. Open the `flight-card.component.html` and look for the line that echos the date of the `Flight` item.

2. Replace the method call with a `Pipe`. You can use Angular's built in `DatePipe`.

For reference take a look at this reference: https://angular.io/api/common/DatePipe.

## Using *ngFor trackBy

When you resubmit the same search, you will find out that `*ngFor` will repaint all items from scratch. This is not necessary, instead we could reuse our existing items byt adding a `trackBy`.

1. Open the `flight-search.component.html` and look for the line that uses `*ngFor`.

2. Add a `trackBy` function into the `*ngFor` loop.

    ```html
    <div *ngFor="let f of flights; trackBy: identifyFlightById" [...]>
    ```

3. Now you need to implement the `identifyFlightById` method in the `flight-search.component.ts`.

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript
    identifyFlightById(index: number, item: Flight): number {
      return item.id;
    }
    ```

   </p>
   </details>

Try resubmitting the same search again and interpret your findings.

## Using Virtual Scrolling

1. To be able to use the Virtual Scrolling we need to install `@angular/cdk` first:
   
   `npm i @angular/cdk` or `yarn @angular/cdk`

2. Now we need to import the scr

    ```typescript
    imports: [[...], ScrollingModule],
    ```
   
3. In the `charts.component.ts` we want to change the count of charts from 4 to something bigger. 

    ```typescript
    chartsCount = 120; // at least ;-)
    ```
   
4. In the `charts.component.html` we need to replace the `div.row` with a virtual scrolling viewport:

    ```html
    <cdk-virtual-scroll-viewport itemSize="40" class="viewport row">
      <div *cdkVirtualFor="let chart of charts; let index = index" [id]="'chart_' + index" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <app-chart [id]="chart.id" [data]="chart.data"></app-chart>
      </div>
    </cdk-virtual-scroll-viewport>
    ```

5. Finally, in the `charts.component.css` we need set a height for the with virtual scrolling viewport:

    ```css
    .viewport {
      height: calc(100vh - 222px);
    }
    ```

6. Check your solution and look into the DevTools Elements to see what's happening!

## Bonus: Unsubscribing RxJS subscriptions

Open the `flight-edit.component.html` and look for subscriptions. You should find at least two of them - if not more than that ;-)

Unsubscribe by using at least two of the introduced methods:

* Explicitly (calling .unsubscribe())
* Implicitly (.pipe(takeUntil(otherSubject))) or
* Using the Async Pipe

If you need a reference open `flight-search.component.ts` - there you'll find the three introduced methods of unsubscribing.
