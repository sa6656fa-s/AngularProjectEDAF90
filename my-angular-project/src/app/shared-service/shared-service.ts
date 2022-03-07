import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    newTitles: string[] = [];
    activeTab: number = 1;
}
