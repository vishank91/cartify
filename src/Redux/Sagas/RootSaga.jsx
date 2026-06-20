import { all } from "redux-saga/effects";

import MaincategorySaga from "./MaincategorySagas";

export default function* RootSaga() {
    yield all([
        MaincategorySaga(),
    ])
}