/* eslint-disable import/no-anonymous-default-export */
import { createUser } from './create-user';
import { deleteUser } from './delete-user';
import { findUsers } from './find-users';
import { getUser } from './get-user';
import { updateUser } from './update-user';

export default [createUser, findUsers, deleteUser, getUser, updateUser];
