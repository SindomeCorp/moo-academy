// Reviewed examples are independent of assessment and runtime implementation.
export const solutions = {
  comments: '"Explain the greeting."; "Only the call prints."; player:tell("Hello from MOO!");',
  objects: 'player:tell("A workshop humming with possibility.");',
  properties: 'this.lamp_on = 1; player:tell("The lamp clicks on.");',
  args: 'player:tell("Color: ", args[1]);',
  branching: 'if (this.locked) player:tell("The door is locked."); else player:tell("You enter."); endif',
  lists: 'tools = {"wrench", "probe", "torch"}; for tool in (tools) player:tell(tool); endfor',
  errors: 'try value = this.missing_property; except (E_PROPNF) player:tell("That property does not exist."); endtry',
};
