import './common.css';
import angular from 'angular';

import {ENDPOINTS} from './constants/endpoints';
import ImagesService from './services/ImagesService';

import { ImagesProviderComponent } from './components/imagesProvider/imagesProvider.component';

import imagesGridDirective from './directives/imagesGrid/imagesGrid.directive.js';

const ngModule = angular.module('imageGrid', ['ngMaterial'])
    .constant('ENDPOINTS', ENDPOINTS)
    .component('imagesProvider', ImagesProviderComponent)
    .service('ImagesService', ImagesService)
    .directive('imagesGrid', imagesGridDirective)
    ;