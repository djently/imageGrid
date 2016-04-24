import '../../app/';

let expect = chai.expect;
let {module, inject} = angular.mock;

let imagesMock = [
    {url: 'testurl1.jpg', name: 'img1'},
    {url: 'testurl2.jpg', name: 'img2'},
    {url: 'testurl3.jpg', name: 'img3'},
    {url: 'testurl4.jpg', name: 'img4'},
    {url: 'testurl5.jpg', name: 'img5'},
    {url: 'testurl6.jpg', name: 'img6'},
    {url: 'testurl7.jpg', name: 'img7'},
    {url: 'testurl8.jpg', name: 'img8'},
    {url: 'testurl9.jpg', name: 'img9'},
    {url: 'testurl10.jpg', name: 'img10'}
];

describe('imageGrid', () => {
    let ImagesService,
        $httpBackend,
        ENDPOINTS;

    beforeEach(module('imageGrid'));
    beforeEach(inject((_$httpBackend_, _ImagesService_, _ENDPOINTS_) => {
        ImagesService = _ImagesService_;
        $httpBackend = _$httpBackend_;
        ENDPOINTS = _ENDPOINTS_;
    }))

    describe('ImagesService', () => {
        it('should be defined', () => {
            expect(ImagesService).not.to.be.undefined;
            expect(ImagesService).to.have.property('getImages');
        });

        describe('#getImages', function() {
            beforeEach(function() {
                $httpBackend.expectGET(ENDPOINTS.imagesSource)
                    .respond(200, {images: imagesMock});
            });


            afterEach(function() {
                $httpBackend.flush();
            });

            it('should return promise with "then"', () => {
                expect(ImagesService.getImages()).to.have.property('then');
            });

            it('should return array of images inside promise', () => {
                ImagesService.getImages().then((images) => {
                    expect(images).to.be.instanceof(Array);
                });
            });

            it('should return limited number of entries', () => {
                const entriesLimit = 3;
                ImagesService.getImages(0, entriesLimit).then((images) => {
                    expect(images.length).to.equal(entriesLimit)
                });
            })

            it('should entries with correct offset', () => {
                const offset = 5,
                      entriesLimit = 3;
                ImagesService.getImages(offset, entriesLimit).then((images) => {
                    expect(images.length).to.equal(entriesLimit);
                    expect(images).to.deep.eql(
                        imagesMock.slice(offset, offset + entriesLimit)
                    );
                });
            });

            it('should return empty array if offset exceeds respond length', () => {
                ImagesService.getImages(imagesMock.length + 1).then((images) => {
                    expect(images).to.be.empty;
                });
            })
        });
    });
});