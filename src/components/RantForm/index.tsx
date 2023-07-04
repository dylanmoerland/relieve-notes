import { useFormik } from "formik";
import { useState, type Dispatch, useCallback } from "react";
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
  const [isRanting, setIsRanting] = useState(false);

  const { values, errors, handleSubmit, handleChange, handleBlur, resetForm } = useFormik<RantFormInputs>({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: (values) => {
      onSubmit(values);
      resetForm();
      setIsRanting(false);
    },
    validationSchema: toFormikValidationSchema(createRant)
  });

  const cancelForm = useCallback(() => {
    resetForm();
    setIsRanting(false);
  }, [resetForm]);

  if (!isRanting) return (
    <div className="flex justify-center flex-1">
      <button className="text-slate-100 border-slate-100 border-2 rounded-md p-2 hover:bg-slate-100 hover:text-slate-900 transition-all" disabled={isLoading} onClick={() => setIsRanting(true)} >START RANTING!!!</button>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 p-4 border-slate-100 border-2 rounded-md">
      <Input label="Title" name="title" value={values.title} error={errors.title} onChange={handleChange} onBlur={handleBlur} />
      <Input label="Content" name="content" value={values.content} error={errors.content} onChange={handleChange} onBlur={handleBlur} />
      <div className="flex flex-col justify-center gap-4 mt-8">
        <button className="text-slate-100 border-slate-100 border-2 rounded-md p-2 hover:bg-slate-100 hover:text-slate-900 transition-all" disabled={isLoading} onClick={() => handleSubmit()} >ARGHH!!!</button>
        <button className="text-slate-400 border-0 hover:text-slate-500 transition-all underline" disabled={isLoading} onClick={cancelForm} >Nevermind...</button>
      </div>
    </div>
  );
}