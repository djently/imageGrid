import 'normalize.css';
import './common.css';
import angular from 'angular';

import {ENDPOINTS} from './constants/endpoints';
import ImagesService from './services/ImagesService.js';

import { imageGridComponent } from './components/imageGrid/imageGrid.component';

import gridImageDirective from './directives/GridImage/GridImage.directive.js';

const ngModule = angular.module('imageGrid', [])
    .constant('ENDPOINTS', ENDPOINTS)
    .component('imageGrid', imageGridComponent)
    .service('ImagesService', ImagesService)
    .directive('gridImage', gridImageDirective)
    ;