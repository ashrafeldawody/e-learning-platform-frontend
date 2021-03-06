import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { TopCoursesComponent } from './top-courses/top-courses.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BecomeInstructorComponent } from './become-instructor/become-instructor.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage.component';
import { StatsComponent } from './stats/stats.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [
        HeroSectionComponent,
        TopCoursesComponent,
        TestimonialsComponent,
        BecomeInstructorComponent,
        FooterComponent,
        HomepageComponent,
        StatsComponent
    ],
    exports: [
        HeroSectionComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class HomepageModule { }
