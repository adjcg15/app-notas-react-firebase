import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dblao5461', 
    api_key: '118497227316312', 
    api_secret: 't43zhkI7eBC_4_14NiFtzTLsoyg',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('debe de cargar un archivo y retornar un URL', async () => {
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            // done();
        });
    });

    test('debe de retornar un error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect(url).toBe(null);
    });
});
