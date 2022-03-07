import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnknownTitleComponent } from './unknown-title/unknown-title.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search-movie', component: MovieSearchComponent },
  { path: 'contact', component: ContactPageComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'movie-information/:title', component: MovieInfoComponent },
  { path: 'title-does-not-exist', component: UnknownTitleComponent  },
  { path: ':', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
