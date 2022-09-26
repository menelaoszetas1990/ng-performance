# Runtime Performance - Change Detection

<!-- TOC -->
* [Runtime Performance - Change Detection](#runtime-performance---change-detection)
  * [Improving Data Binding Performance with OnPush](#improving-data-binding-performance-with-onpush)
    * [Bonus: Search for Change Detection cycles in you own project](#bonus--search-for-change-detection-cycles-in-you-own-project)
  * [Zone Pollution by 3rd party lib](#zone-pollution-by-3rd-party-lib)
    * [Bonus: Search for Change Detection cycles in you own project](#bonus--search-for-change-detection-cycles-in-you-own-project-1)
<!-- TOC -->

## Improving Data Binding Performance with OnPush

1. Open the file `flight-search.component.ts` and look at this method ``delayFirstFlight`` which is bound to the button with the label `Delay 1st Flight` in the HTML Template.

    ```typescript
    delay(): void {
      if (this.flights.length > 0) {
        const ONE_MINUTE = 1000 * 60;
        const oldFlights = this.flights;
        const oldFlight = oldFlights[0];
        const oldDate = new Date(oldFlight.date);

        // Mutable
        oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
        oldFlight.date = oldDate.toISOString();
      }
    }
    ```

    ```html
        [...]
          Search
        </button>

        <button *ngIf="flights.length > 0" class="btn btn-default" style="margin-left: 10px"
                (click)="delayFirstFlight()">
          Delay 1st Flight
        </button>
      </div>
      [...]
    ```
2. Now open the file `flight-card.component.ts` inject this in your constructor: `constructor(private element: ElementRef, private zone: NgZone) {}` (make sure the imports are added correctly) and then add this `blink` method to your component.

    ```typescript
    blink(): void {
      // Dirty Hack used to visualize the change detector
      // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
      this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
      //              ^----- DOM-Element

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.element.nativeElement.firstChild.style.backgroundColor = 'white';
        }, 1000);
      });
    }
    ```

3. Move to the file `flight-card.component.html` and create a data binding for this method at the end:
    ```
    {{ blink() }}
    ```
   Please note that binding methods is not a good idea with respect to performance. We do it here just to visualize the change tracker.

4. Open the solution in the browser and search for flights form `Hamburg` to `Graz`.

5. Click the button `Delay 1st Flight` and see that just the first flight gets a new date. But you also see that every component is checked for changes by Angular b/c every component blinks.

6. Open the file `flight-card.component.ts`. Switch on `OnPush` for your `FlightCard`.

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript

    import {ChangeDetectionStrategy} from '@angular/core';
    [...]
    @Component({
      selector: 'flight-card',
      templateUrl: 'flight-card.component.html',
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class FlightCardComponent {
      [...]
    }
    ```

    </p>
    </details>

7. Open the `flight-search.component.ts` and alter it to update the selected flight's date in an *immutable* way:

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript    
    delay(): void {
      if (this.flights.length > 0) {
        const ONE_MINUTE = 1000 * 60;

        const oldFlights = this.flights;
        const oldFlight = oldFlights[0];
        const oldDate = new Date(oldFlight.date);

        // Mutable
        // oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE );
        // oldFlight.date = oldDate.toISOString();

        // Immutable
        const newDate = new Date(oldDate.getTime() + 15 * ONE_MINUTE);
        this.flights[0] = { ...oldFlight, date: newDate.toISOString() };
      }
    }
    ```

   </p>
   </details>

   You find some information about the object spread operator (e. g. `...oldFlight`) [here](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html) (scroll down to Object Spread) and about the array spread operator [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

8. Make sure your implementation works. Switch to the browser and search for flights again. Click `Delay 1st Flight` one more time and find out that Angular is just checking and updating the first flight card.

### Bonus: Search for Change Detection cycles in you own project

Open an Angular workspace of your own work and use the same blink() method to search for uneccessary change detetection cycles in your App. Alternatively you can use the Angular DevTools Profiler.

If you find something try to fix it with `ChangeDetectionStrategy.OnPush`. See if everything else still works or if you need to fix mutable changes.

##  Zone Pollution by 3rd party lib

1. Just like in the first exercise open file `chart.component.ts` and uncomment the `blink()` method. Make sure all imports are added correctly and then add this to the HTML-template:

    ```
    {{ blink() }}
    ```

2. You should now see the effect of the zone pollution by the chart library: Endless `Change Detection` cycles.

3. Fix the zone pollution by wrapping the chart initialization into an `ngZone.runOutsideAngular()` statement.

    <details>
    <summary>Show Code</summary>
    <p>

    ```typescript    
    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.chart.container(this.container.nativeElement);
            this.chart.draw();
        });
    }
    ```

   </p>
   </details>

### Bonus: Search for Change Detection cycles in you own project

1. Open an Angular workspace of your own work and use the same blink() method to search for zone pollution in your App. Alternatively you can use the Angular DevTools Profiler.

2. If you find something try to fix it with `ngZone.runOutsideAngular()`. See if everything else still works.
