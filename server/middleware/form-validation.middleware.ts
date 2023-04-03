import { RouterMiddleware } from "oak";
import { AppState, FormValidator } from "/types.ts";

const formDataValidationMiddleware = <T extends {}>(validators: FormValidator<T>[]) => {
  const middleware: RouterMiddleware<any, any, AppState> = async ({ request, state }, next) => {
    const formData = await request.body().value as URLSearchParams;
    const errors: string[] = [];

    for (const { key, validate, error } of validators) {
      const value = formData.get(key as string);
      if (!(await validate(value)))
        errors.push(error);
    }

    if (errors.length)
      state.session.flash("formErrors", errors);
    else
      state.session.flash("formData", Object.fromEntries([...formData]));
    await next();
  };
  return middleware;
};

export default formDataValidationMiddleware;