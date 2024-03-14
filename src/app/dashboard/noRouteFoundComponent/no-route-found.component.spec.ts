import { TestBed } from '@angular/core/testing';
import { NoRouteFoundComponent } from './no-route-found.component';

describe('NoRouteFoundComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoRouteFoundComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NoRouteFoundComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
