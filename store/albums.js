// /* eslint-disable no-console */
// import { v4 as uuidV4, v1 as uuidV1 } from 'uuid'

// export default {
//     mutations: {

//     },
//     actions: {
//         async postAlbumCard(payload) {
//             try {
//                 const cardImagesRef = await this.$fire.storage
//                     .ref('/albums_cards/')
//                     .child(uuidV1())

//                 this.newCard.cardImages.forEach(async (image) => {
//                     const imageRef = cardImagesRef.child(uuidV4())
//                     await imageRef.put(image)
//                     const url = await imageRef.getDownloadURL()
//                     payload.images.push(url)
//                 })
//                 await this.$fire.database.ref('albums/cards').push(payload)

//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }
// }