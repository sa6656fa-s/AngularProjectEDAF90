import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sok-film', component: MovieSearchComponent },
  { path: 'kontakt', component: ContactPageComponent},
  { path: 'varukorg', component: ShoppingCartComponent },
  { path: 'filminformation/:title', component: MovieInfoComponent },
  { path: ':', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
