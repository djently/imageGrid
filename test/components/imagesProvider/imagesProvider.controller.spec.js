import '../../../app/';

let expect = chai.expect;
let {module, inject} = angular.mock;

import {imagesMock} from '../../mocks/imagesMock.js';
let varImagesMock = [].concat(imagesMock);

describe('imageGrid', () => {
    beforeEach(module('imageGrid', function($provide) {
        $provide.value('ImagesService', {
            getImages: () => {
                return {
                    then: function(cb) {
                        cb(varImagesMock);
                        return this;
                    }
                }
            }
        });
    }));

    describe('ImagesProviderController', () => {
        let $controller, $scope, IPController;
        beforeEach(inject((_$controller_, $rootScope) => {
            $controller = _$controller_;
            $scope = $rootScope.$new();

            IPController = $controller('ImagesProviderController', {
                $element: angular.element('<div></div>'),
                $scope: $scope
            });
        }));

        it('should call ImagesService#getImages on create', inject((ImagesService) => {
            ImagesService.getImages = chai.spy(ImagesService.getImages);

            $controller('ImagesProviderController', {
                $element: angular.element('<div></div>'),
                $scope: $scope
            });
            $scope.$apply();

            expect(ImagesService.getImages).to.have.been.called();
        }));

        it('should be defined', () => {
            expect(IPController).not.to.be.undefined;
        });

        describe('#loadImages', function() {
            it('should update #ImagesServiceOffset', function() {
                var prevImagesServiceOffset = IPController.ImagesServiceOffset;
                IPController.loadImages();
                expect(IPController.ImagesServiceOffset)
                    .to.be.above(prevImagesServiceOffset);
            })

            it('should call ImagesService#getImages', inject((ImagesService) => {
                ImagesService.getImages = chai.spy(ImagesService.getImages);
                IPController.loadImages();
                expect(ImagesService.getImages).to.have.been.called();
            }));

            it('should update controller\'s items', () => {
                let previousItemsCount = IPController.images.length;
                varImagesMock = [{url: 'anotherurl', name: 'anotherImage'}];

                IPController.loadImages().then(function() {
                    expect(IPController.images.length)
                        .to.equal(previousItemsCount + 1);

                    varImagesMock = imagesMock;
                })
            })

            it('should broadcast "ig.imagesUpdated"', inject(($timeout) => {
                let eventHandler = chai.spy(angular.noop);
                $scope.$on('ig.imagesUpdated', eventHandler);

                IPController.loadImages();
                $timeout.flush();

                expect(eventHandler).to.have.been.called();
            }));
        })

        describe('#removeImage', () => {
            it('should remove existing image entry', () => {
                let prevImagesCount = IPController.images.length;
                IPController.removeImage(IPController.images[0]);
                expect(IPController.images.length)
                    .to.be.equal(prevImagesCount - 1);
            })

            it('shouldn\'t remove image if it not exists', () => {
                let prevImagesCount = IPController.images.length;
                IPController.removeImage({url: 'not_exists'});
                expect(IPController.images.length).to.be.equal(prevImagesCount);
            });
        });

        describe('#loadedImagesCounter', () => {
            it('should update #loadedImages', () => {
                varImagesMock[3].loaded = true;
                varImagesMock[5].loaded = true;

                IPController.loadedImagesCounter();
                expect(IPController.loadedImages).to.equal(2);

                varImagesMock[6].loaded = true;
                IPController.loadedImagesCounter();
                expect(IPController.loadedImages).to.equal(3);
            })

            it('should run digest', () => {
                $scope.$digest = chai.spy($scope.$digest);
                IPController.loadedImagesCounter();
                expect($scope.$digest).to.have.been.called();
            });
        })
    });
});