import { all } from "redux-saga/effects";

import MaincategorySaga from "./MaincategorySagas";
import SubcategorySaga from "./SubcategorySagas";
import BrandSaga from "./BrandSagas";
import ProductSaga from "./ProductSagas";
import FeatureSaga from "./FeatureSagas";
import FaqSaga from "./FaqSagas";
import SettingSaga from "./SettingSagas";

export default function* RootSaga() {
    yield all([
        MaincategorySaga(),
        SubcategorySaga(),
        BrandSaga(),
        ProductSaga(),
        FeatureSaga(),
        FaqSaga(),
        SettingSaga(),
    ])
}