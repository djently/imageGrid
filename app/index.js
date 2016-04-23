import './common.css';
import angular from 'angular';

import {ENDPOINTS} from './constants/endpoints';
import ImagesService from './services/ImagesService.js';

import { GridComponent } from './components/grid/grid.component.js';

import gridImageDirective from './directives/GridImage/GridImage.directive.js';

const ngModule = angular.module('imageGrid', ['ngMaterial'])
    .constant('ENDPOINTS', ENDPOINTS)
    .component('grid', GridComponent)
    .service('ImagesService', ImagesService)
    .directive('gridImage', gridImageDirective)
    ;