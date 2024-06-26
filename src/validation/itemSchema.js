import * as yup from 'yup';
export const itemSchema = yup.object().shape({
  name: yup
    .string().trim()
    .max(255, 'Item name cannot exceed 255 characters')
    .min(1, 'Item name must have at least 1 character')
    .required('Item must have a name'),
  description: yup
    .string().trim(),
  tags: yup
    .array().of(
      // validation of tags
      yup.object().shape({
        name: yup.string().trim().max(255, 'Tags cannot exceed 255 characters each')
      }))
    .max(10, 'Items may have a maximum of 10 tags each')
  //TODO: add image validation
});
