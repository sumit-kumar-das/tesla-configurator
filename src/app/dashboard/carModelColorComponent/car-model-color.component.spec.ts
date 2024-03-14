import { TestBed } from '@angular/core/testing';
import { CarModelColorComponent } from './car-model-color.component';

describe('CarModelColorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModelColorComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CarModelColorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'tesla-configurator' name`, () => {
    const fixture = TestBed.createComponent(CarModelColorComponent);
    const app = fixture.componentInstance;
    expect(app.name).toEqual('tesla-configurator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CarModelColorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, tesla-configurator');
  });
});
