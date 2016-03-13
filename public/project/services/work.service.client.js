
"use strict";

(function () {
    angular
        .module("ArtBridgeApp")
        .factory("WorkService", workService);

    function workService() {

        var works = [];
        works = [
            {"_id": "000", "title": "Marylin",
                "url": "http://ichef-1.bbci.co.uk/news/660/media/images/78824000/jpg/_78824834_0c6d8241-b8de-46ed-b2f7-49345f66bcf0.jpg",
                "userId": 123},
            {"_id": "001", "title": "Elvis",
                "url": "http://youniverseonline.com/UploadFiles/20110521/20110521172725122011052117283520130611160131.jpg",
                "userId": 123},
            {"_id": "020", "title": "Joseph Roulin",
                "url": "https://upload.wikimedia.org/wikipedia/commons/0/01/Portrait_of_the_Postman_Joseph_Roulin_%281889%29_van_Gogh_Kroller.jpg",
                "userId": 234},
            {"_id": "021", "title": "Starry Night",
                "url": "https://i.ytimg.com/vi/XVOuRSJ3D5o/maxresdefault.jpg",
                "userId": 234},
            {"_id": "040", "title": "The Ship",
                "url": "https://s-media-cache-ak0.pinimg.com/736x/ee/4d/6e/ee4d6e08273e70d93c6c0805c023c87d.jpg",
                "userId": 345},
            {"_id": "041", "title": "Deli Self Portrait",
                "url": "http://cdn.zouchmagazine.com/wp-content/uploads/2011/06/dali.jpg",
                "userId": 345},
            {"_id": "060", "title": "Monalisa",
                "url": "http://image.made-in-china.com/4f0j00hMvQfbTtuaqc/Mona-Lisa-Reproduction-Oil-Paintings.jpg",
                "userId": 456},
            {"_id": "061", "title": "Eye of the Kitty",
                "url": "http://other00.deviantart.net/5cb6/o/2014/008/e/e/eec49345df23054bddbc2c44e0218530.jpg",
                "userId": 567},
            {"_id": "070", "title": "Gollum",
                "url": "http://other00.deviantart.net/d724/o/2014/008/9/4/94ab61fb2f37e95584f436314d4e061d.jpg",
                "userId": 567}
        ];

        var api = {
            createWorkForUser: createWorkForUser,
            findAllWorkForUser: findAllWorkForUser,
            deleteWorkById: deleteWorkById,
            updateWorkById: updateWorkById
        };
        return api;

        function createWorkForUser(userId, work, callback) {
            work._id = (new Date).getTime();
            work.userId = userId;
            works.push(work);
            callback(work);
        }

        function findAllWorkForUser(userId, callback) {
            var userWork = [];
            for (var i = 0; i < works.length; i++) {
                if (works[i].userId === userId) {
                    userWork.push(works[i]);
                }
            }
            callback(userWork);
        }

        function deleteWorkById(workId, callback) {
            for (var i = 0; i < works.length; i++) {
                if (works[i]._id === workId) {
                    works.splice(i, 1);
                    break;
                }
            }
            callback(works);
        }

        function updateWorkById(workId, newWork, callback) {
            for (var i = 0; i < works.length; i++) {
                if (works[i]._id === workId) {
                    works[i] = newWork;
                    callback(works[i]);
                    break;
                }
            }
        }
    }
})();