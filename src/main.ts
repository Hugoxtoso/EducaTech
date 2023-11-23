import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app-material/app.module';

//eu quem fiz hugo
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
