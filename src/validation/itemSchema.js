import * as yup from 'yup';

const MAX_TAGS = 50;
const MAX_ITEMS = 10;
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const itemSchema = yup.object().shape({
  name: yup
    .string().trim()
    .max(255, 'ItemCard name cannot exceed 255 characters')
    .min(1, 'ItemCard name must have at least 1 character')
    .required('ItemCard must have a name'),
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
          `Image cannot exceed ${MAX_FILE_SIZE_MB} MB`,
          (val) => {
            return val && val.size <= MAX_FILE_SIZE_MB * 1048576;
          }
        )
        .test(
          'allowedFormat',
          `File type not allowed`,
          (val) => {
            return val && ALLOWED_FILE_TYPES.includes(val.type);
          }
        )
    )
    .max(MAX_ITEMS, `Items may have a maximum of ${MAX_ITEMS} images each`)
});
