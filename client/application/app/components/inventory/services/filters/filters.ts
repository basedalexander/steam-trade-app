import { IInventoryFilter } from './intentory-item.interface';

import { typeKeyFilter } from './type/type.key.filter';
import { typeGiftFilter } from './type/type.gift.filter';
import { typeContainerFilter } from './type/type.container.filter';
import { typePassFilter } from './type/type.pass.filter';
import { typeMusicFilter } from './type/type.music.filter';
import { typeKnifeFilter } from './type/type.knife.filter';
import { typeMachinegunFilter } from './type/type.machinegun.filter';
import { typePistolFilter } from './type/type.pistol.filter';
import { typeRifleFilter } from './type/type.rifle.filter';
import { typeShotgunFilter } from './type/type.shotgun.filter';
import { typeSMGFilter } from './type/type.smg.filter';
import { typeSniperRifleFilter } from './type/type.sniper-rifle.filter';
import { typeStickerFilter } from './type/type.sticker.filter';
import { categoryNormalFilter } from './category/category.normal.filter';
import { categorySouvenirFilter } from './category/category.souvenir.filter';
import { categoryStatTrakFilter } from './category/category.stat-trak.filter';
import { categoryStarFilter } from './category/category.star.filter';
import { categoryStarStatTrakFilter } from './category/category.star-stat-trak.filter';
import { qualityBaseGradeFilter } from './quality/quality.base-grade.filter';
import { qualityClassifiedFilter } from './quality/quality.classified.filter';
import { qualityConsumerGradeFilter } from './quality/quality.consumer-grade.filter';
import { qualityCovertFilter } from './quality/quality.covert.filter';
import { qualityExoticFilter } from './quality/quality.exotic.filter';
import { qualityExtraordinaryFilter } from './quality/quality.extraordinary.filter';
import { qualityHighGradeFilter } from './quality/quality.high-grade.filter';
import { qualityIndustrialGradeFilter } from './quality/quality.industrial-grade.filter';
import { qualityMilSpecGradeFilter } from './quality/quality.mil-spec-grade.filter';
import { qualityRemarkableFilter } from './quality/quality.remarkable.filter';
import { qualityRestrictedFilter } from './quality/quality.restricted.filter';
import { qualityBattleScarredFilter } from './exterior/extrerior.battle-scarred.filter';
import { qualityFactoryNewFilter } from './exterior/exterior.factory-new.filter';
import { qualityFieldTestedFilter } from './exterior/exterior.field-tested.filter';
import { qualityMinimalWearFilter } from './exterior/exterior.minimal-wear.filter';
import { qualityWellWornFilter } from './exterior/exterior.well-worn.filter';

export let INVENTORY_FILTERS: IInventoryFilter[] = [
    typeContainerFilter,
    typeGiftFilter,
    typeKeyFilter,
    typeKnifeFilter,
    typeMachinegunFilter,
    typeMusicFilter,
    typePassFilter,
    typePistolFilter,
    typeRifleFilter,
    typeShotgunFilter,
    typeSMGFilter,
    typeSniperRifleFilter,
    typeStickerFilter,

    categoryNormalFilter,
    categorySouvenirFilter,
    categoryStatTrakFilter,
    categoryStarFilter,
    categoryStarStatTrakFilter,

    qualityBaseGradeFilter,
    qualityClassifiedFilter,
    qualityConsumerGradeFilter,
    qualityCovertFilter,
    qualityExoticFilter,
    qualityExtraordinaryFilter,
    qualityHighGradeFilter,
    qualityIndustrialGradeFilter,
    qualityMilSpecGradeFilter,
    qualityRemarkableFilter,
    qualityRestrictedFilter,

    qualityBattleScarredFilter,
    qualityFactoryNewFilter,
    qualityFieldTestedFilter,
    qualityMinimalWearFilter,
    qualityWellWornFilter
];
