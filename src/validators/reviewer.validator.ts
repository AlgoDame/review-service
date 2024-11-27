import Joi from 'joi';
import { IGenre, Language } from '../models/reviewers.model';

export function createReviewerValidator(value: any) {
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    bio: Joi.string(),
    profileImage: Joi.string(),
    preferredGenres: Joi.array()
      .items(Joi.string().valid(...Object.values(IGenre)))
      .required(),
    primaryLanguage: Joi.string()
      .valid(...Object.values(Language))
      .required(),
    languages: Joi.array().items(Joi.string().valid(...Object.values(Language)))
  }).validate(value);
}

export function updateReviewerValidator(value: any) {
  return Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    bio: Joi.string(),
    profileImage: Joi.string(),
    preferredGenres: Joi.array().items(Joi.string().valid(...Object.values(IGenre))),
    primaryLanguage: Joi.string().valid(...Object.values(Language)),
    languages: Joi.array().items(Joi.string().valid(...Object.values(Language)))
  }).validate(value);
}
