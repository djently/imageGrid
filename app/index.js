import './common.css';
import angular from 'angular';

import {ENDPOINTS} from './constants/endpoints';
import ImagesService from './services/ImagesService';

import ImagesProviderController from './components/imagesProvider/imagesProvider.controller';
import { ImagesProviderComponent } from './components/imagesProvider/imagesProvider.component';

import imagesGridDirective from './directives/imagesGrid/imagesGrid.directive.js';
import imagesGridItemDirective from './directives/imagesGridItem/imagesGridItem.directive.js';

angular.module('imageGrid', ['ngMaterial'])
    .constant('ENDPOINTS', ENDPOINTS)
    .service('ImagesService', ImagesService)

    .controller('ImagesProviderController', ImagesProviderController)
    .component('imagesProvider', ImagesProviderComponent)

    .directive('imagesGrid', imagesGridDirective)
    .directive('imagesGridItem', imagesGridItemDirective)
    ;