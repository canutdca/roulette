import { CeremonyMemberName } from './CeremonyMemberName'
import { CeremonyMemberStrikethrough } from './CeremonyMemberStrikethrough';

export class CeremonyMember{
	constructor(public name: CeremonyMemberName, public strikethrough: CeremonyMemberStrikethrough = new CeremonyMemberStrikethrough(false)) {}
}
