import { GroupRouletteId } from './GroupRouletteId';
import { GroupRouletteName } from './GroupRouletteName';

export class GroupRoulette {
    constructor(public readonly id: GroupRouletteId, public readonly name: GroupRouletteName) {}
}
