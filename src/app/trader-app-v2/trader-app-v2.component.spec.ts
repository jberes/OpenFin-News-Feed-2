import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IgxNavigationDrawerModule, IgxIconModule, IgxCategoryChartModule } from 'igniteui-angular';
import { TraderAppV2Component } from './trader-app-v2.component';

describe('TraderAppV2Component', () => {
  let component: TraderAppV2Component;
  let fixture: ComponentFixture<TraderAppV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraderAppV2Component ],
      imports: [ NoopAnimationsModule, FormsModule, IgxNavigationDrawerModule, IgxIconModule, IgxCategoryChartModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderAppV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
