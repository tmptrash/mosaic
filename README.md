# mosaic
Photo mosaic algorithm implementation in pure JS. A photomosaic, is a digital image that is made up of other digital images, pieced together by software. Photomosaics are generally credited to Robert Silvers, who developed the technique while he was a student at MIT. 

# how to run
Prepare a folder with jpg images (in our example it's called `imgs`) in this format `nXXX.jpg`. Where `XXX` it's an image index number starting from 0. For example: `n0.jpg, n1.jpg` and so on. We will use them as a source images to build the final (big) picture. Find as many images as you can, because it affects the final picture quality. Install dependencies and run local http-server with `imgs` folder as a parameter. Don't forget to add `--cors` parameter in the end. Run the mosaic app and go to your browser URL `localhost:port` and you will see this simple UI:\
\
<img width="1136" alt="image" src="https://github.com/tmptrash/mosaic/assets/1142545/68b1c0be-ce8c-4394-9e92-d349cfdf8477">\
\
Cell `width & height` means the size of one cell (picture will be split into cells) on a final picture, where our app will put one of the source images, which fits best. The `URL` means a URL of the final picture, made up of other images. `Generate` button runs the process. `Download` button downloads final picture into the png file.\
\
`npm i` - to install dependencies\
`npx http-server ./imgs --cors` to run local server with images\
`npm run start` - to run mosaic in a dev mode\
`npm run build` - to build mosaic in production

# screenshot
![mosaic-me12x12](https://github.com/tmptrash/mosaic/assets/1142545/8eadcb90-551b-4282-b257-096dde8946d1)
