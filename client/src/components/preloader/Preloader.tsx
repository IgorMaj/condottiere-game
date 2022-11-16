import { useReducer } from 'react';
import { MediaType, PreloadMedia } from 'react-preload-media';
import { SpinnerCircular } from 'spinners-react';

function importAll(r: any) {
  const images: any = [];
  r.keys().forEach((item: string) => {
    images.push(r(item));
  });
  return images;
}

const getImages = () =>
  importAll(
    (require as any).context('../../assets', true, /\.(png|jpe?g|svg)$/)
  );

const media = getImages().map((url: string) => {
  return { type: MediaType.Image, url: url };
});

const SPINNER_SIZE = '150px';

export const Preloader = (props: { children: any }) => {
  const [isLoaded, loaded] = useReducer(() => true, false);
  return (
    <>
      <PreloadMedia media={media} onFinished={() => loaded()}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            marginTop: '200px',
          }}
        >
          <SpinnerCircular color="#ba8c63" size={SPINNER_SIZE} />
        </div>
      </PreloadMedia>
      {isLoaded ? props.children : <></>}
    </>
  );
};
