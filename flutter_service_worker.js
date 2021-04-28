'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "78bb2ff49d76f777a3495a3790197fb2",
"index.html": "ed4909d3e7bdcd8e435aa3ba2b526573",
"/": "ed4909d3e7bdcd8e435aa3ba2b526573",
"main.dart.js": "5f87d0a46f7bc560613a281df1610ac9",
"favicon.png": "5a2d464ca4020987f2335ef4fde0065c",
"icons/Icon-192.png": "562bdf2ff9ecf61b44b6cb7d06e5d285",
"icons/Icon-512.png": "783919c738a517b4e76812066cb4a4c6",
"manifest.json": "652b5e1669b4f827081780e21936ed9b",
"assets/AssetManifest.json": "23d020595ffde6ecc0c3ebcd448519a4",
"assets/NOTICES": "a1c1686dc8ffe72f094253cd035c5f26",
"assets/FontManifest.json": "d5d1502146a32b07d9d8b6e4508e7208",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dffd9504fcb1894620fa41c700172994",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "4b6a9b7c20913279a3ad3dd9c96e155b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "00bb2b684be61e89d1bc7d75dee30b58",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/Images/socialIcons/meetup.png": "7074273ed118c49cfcf42cf94e45fbb7",
"assets/assets/Images/socialIcons/GDG.png": "cfff16aaa7ad57b581b63e281148528b",
"assets/assets/Images/socialIcons/slack_white.png": "87efa5e3b01d2404f87689cad244e3b3",
"assets/assets/Images/socialIcons/youtube_icon.png": "1492a88e08ffe89d62ca9ebfd73cd918",
"assets/assets/Images/socialIcons/youtube_social_circle_red.png": "bf007f545da08dda9d73ffe7dfe5d79a",
"assets/assets/Images/socialIcons/add_to_slack.png": "a333a01b236e1ce2f2920963496c41e4",
"assets/assets/Images/socialIcons/slack.png": "463f0ca531c745d47b06ee46cddf3687",
"assets/assets/Images/socialIcons/twitter.png": "1dec5847bd57aec3f54ce6ad3087d92e",
"assets/assets/Images/socialIcons/youtube.png": "bd19288cf524ccbd6c5226f0bf83f2eb",
"assets/assets/Images/socialIcons/facebook.png": "079d7215d66abc03002cc4f1e85cb04a",
"assets/assets/Images/Logos/Organizer_Logo/flutter_surat_logo.jpg": "c48ee4e9f02cf2df349bc479091ed9f1",
"assets/assets/Images/Logos/Sponsors_Logo/slido_sponsor.svg": "61e1ed881c3ebbe77eb9613b2de5e35b",
"assets/assets/Images/Logos/Sponsors_Logo/slido_sponsor.png": "ca587bd916e78cdb232f6acee6d03b2e",
"assets/assets/Images/Logos/FlutterConLogos/Vector.png": "3d8e23f3eaaeb7de47e31c6c5c58c576",
"assets/assets/Images/Logos/FlutterConLogos/Group_twenty.png": "d491bd546d611ff930ff49b344db4285",
"assets/assets/Images/Logos/FlutterConLogos/Hello.png": "d78ddb114aeaba9db5f1d12d39db33ac",
"assets/assets/Images/extra/newHomePage.png": "1014c2b4f93efc9ac8ae1b68ba0af429",
"assets/assets/Images/extra/doughnut.png": "3b04c808945b90663331fb90d7c06dd7",
"assets/assets/Images/extra/woman-discuss.png": "8aba03c0e257f67662f2530093e7cf49",
"assets/assets/Images/extra/speaker.png": "aa17fd047e4f42d2068a37e283f732ab",
"assets/assets/Images/cover_Images/cover_image.png": "6b1231ef486a2c8e621bbb2a318326f8",
"assets/assets/Images/cover_Images/cover_image_1.png": "65106e4b7c36dafde056c9e843a43890",
"assets/assets/Images/cover_Images/Twitter_Cover.png": "de1200bd964590ca64731bcce6767baf",
"assets/assets/json/speakers.json": "e2955e2e93fd0b811b80ddd271cd5b72",
"assets/assets/json/organizers.json": "debabeddc2468c09c14a7e25df7a3c7f",
"assets/assets/fonts/rockybilly.ttf": "9cd9dc4ce0f4a618fb244aecea70788a",
"assets/assets/fonts/ProductSans.ttf": "d41d8cd98f00b204e9800998ecf8427e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
