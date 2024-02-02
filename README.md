# mosaic
Photo mosaic algorithm implementation in pure JS. A photomosaic, is a digital image that is made up of other digital images, pieced together by software. Photomosaics are generally credited to Robert Silvers, who developed the technique while he was a student at MIT. 

# how to run
Prepare a folder with jpg images (in our example it's called `imgs`) in this format `nXXX.jpg`. Where `XXX` it's an image index number starting from 0. For example: `n0.jpg, n1.jpg` and so on. We will use them as a source images to build the final (big) picture. Find as many images as you can, because it affects the final picture quality. Install dependencies and run local http-server with `imgs` folder as a parameter. Don't forget to add `--cors` parameter in the end. Run the mosaic app and go to your browser URL `localhost:port` and you will see this simple UI:\
\
<img width="1115" alt="image" src="https://github.com/tmptrash/mosaic/assets/1142545/65740fee-19b0-45c4-9411-5128c82654f5">\
\
Cell `width & height` means the size of one cell (picture will be split into cells) on a final picture, where our app will put one of the source images, which fits best. The `URL` means a URL of the final picture, made up of other images. `Generate` button runs the process. `Download` button downloads final picture into the png file.\
\
`npm i` - to install dependencies\
`npx http-server ./imgs --cors` to run local server with images\
`npm run start` - to run mosaic in a dev mode\
`npm run build` - to build mosaic in production

# screenshot
![mosaic-me12x12](https://github.com/tmptrash/mosaic/assets/1142545/c2ffb246-b731-4d2c-b226-619afb787862)

