# Further Runtime Performance

<!-- TOC -->
* [Runtime Performance](#runtime-performance)
  * [Optimization with Angular Pipes](#optimization-with-angular-pipes)
  * [Using *ngFor trackBy](#using--ngfor-trackby)
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

## Bonus: Unsubscribing RxJS subscriptions

Open the `flight-edit.component.html` and look for subscriptions. You should find at least two of them - if not more than that ;-)

Unsubscribe by using at least two of the introduced methods:

* Explicitly (calling .unsubscribe())
* Implicitly (.pipe(takeUntil(otherSubject))) or
* Using the Async Pipe

If you need a reference open `flight-search.component.ts` - there you'll find the three introduced methods of unsubscribing.
