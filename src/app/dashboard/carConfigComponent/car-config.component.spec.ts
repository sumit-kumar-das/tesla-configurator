import { TestBed } from '@angular/core/testing';
import { CarConfigComponent } from './car-config.component';

describe('CarConfigComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarConfigComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CarConfigComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CarConfigComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, tesla-configurator');
  });
});
