import { RouletteMemberName } from './RouletteMemberName'
import { RouletteMemberStrikethrough } from './RouletteMemberStrikethrough';

export class RouletteMember{
	constructor(public name: RouletteMemberName, public strikethrough: RouletteMemberStrikethrough = new RouletteMemberStrikethrough(false)) {}
}
