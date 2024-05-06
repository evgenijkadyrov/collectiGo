// import { ArtworkByIdWithImage, SortOption } from '@/types/interfaces'
//
// export const sortData = (
//   data: ArtworkByIdWithImage[],
//   type: SortOption
// ): ArtworkByIdWithImage[] => {
//   switch (type) {
//     case 'asc':
//       return [...data].sort((a, b) => a.localeCompare(b))
//     case 'desc':
//       return [...data].sort((a, b) => b.title.localeCompare(a.title))
//     case 'latest':
//       return [...data].sort(
//         (a, b) => new Date(a.date_end).getTime() - new Date(b.date_end).getTime()
//       )
//     case 'newest':
//       return [...data].sort(
//         (a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime()
//       )
//     default:
//       return data
//   }
// }
