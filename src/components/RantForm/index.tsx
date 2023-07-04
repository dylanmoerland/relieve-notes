import { useFormik } from "formik";
import { type Dispatch } from "react";
import { type TypeOf } from "zod";
import { Input } from "../Input";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createRant } from "~/dto/createRant";

type RantFormInputs = TypeOf<typeof createRant>;

interface RantFormProps {
  onSubmit: Dispatch<RantFormInputs>;
  isLoading: boolean;
}

export const RantForm: React.FC<RantFormProps> = ({ onSubmit, isLoading }) => {

  const { values, errors, handleSubmit, handleChange, handleBlur, resetForm } = useFormik<RantFormInputs>({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: (values) => {
      onSubmit(values);
      resetForm();
    },
    validationSchema: toFormikValidationSchema(createRant)
  });

  return (
    <div className="flex flex-col flex-1 p-4 border-slate-100 border-2 rounded-md">
      <Input label="Title" name="title" value={values.title} error={errors.title} onChange={handleChange} onBlur={handleBlur} />
      <Input label="Content" name="content" value={values.content} error={errors.content} onChange={handleChange} onBlur={handleBlur} />
      <div className="flex justify-center">
        <button className="text-slate-100 border-slate-100 border-2 rounded-md p-2" disabled={isLoading} onClick={() => handleSubmit()} >ARGHH!!!</button>
      </div>
    </div>
  );
}