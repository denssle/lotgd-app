import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileBurgerMenuComponent } from './profile-burger-menu.component';

describe('DebugMenuComponent', () => {
	let component: ProfileBurgerMenuComponent;
	let fixture: ComponentFixture<ProfileBurgerMenuComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ProfileBurgerMenuComponent ],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(ProfileBurgerMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
