import type { Dispatch, GetState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch : ()=>Dispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<GetState> = useSelector