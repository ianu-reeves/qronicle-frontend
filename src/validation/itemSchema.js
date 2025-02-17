import * as yup from 'yup';
import { Constants } from "../util/Constants";

const { MAX_TAGS, MAX_IMAGES, MAX_FILE_SIZE } = Constants;
const ALLOWED_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const itemSchema = yup.object().shape({
  name: yup
    .string().trim()
    .max(255, 'Name cannot exceed 255 characters')
    .min(1, 'Name must have at least 1 character')
    .required('Item must have a name'),
  description: yup
    .string().trim(),
  tags: yup
    .array().of(
      // validation of tags
      yup.string().max(255, 'Tags may have a maximum of 255 characters each')
    )
    .max(MAX_TAGS, `Items may have a maximum of ${MAX_TAGS} tags each`),
  images: yup
    .array().of(
      yup.mixed()
        .test(
          'fileSize',
          `Image cannot exceed ${MAX_FILE_SIZE} MB`,
          (val) => {
            return val && val.size <= MAX_FILE_SIZE;
          }
        )
        // .test(
        //   'allowedFormat',
        //   `File type not allowed`,
        //   (val) => {
        //     return val && ALLOWED_FILE_TYPES.includes(val.type);
        //   }
        // )
    )
    .max(MAX_IMAGES, `Items may have a maximum of ${MAX_IMAGES} images each`)
});
