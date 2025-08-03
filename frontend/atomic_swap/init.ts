import * as escrowDst from "./escrow-dst/structs";
import * as escrowSrc from "./escrow-src/structs";
import * as limitOrderProtocol from "./limit-order-protocol/structs";
import * as timelocks from "./timelocks/structs";
import { StructClassLoader } from "../../../atomic_swap/_framework/loader";

export function registerClasses(loader: StructClassLoader) {
  loader.register(escrowDst.EscrowCancelled);
  loader.register(escrowDst.EscrowDst);
  loader.register(escrowDst.EscrowWithdrawal);
  loader.register(escrowSrc.EscrowCancelled);
  loader.register(escrowSrc.EscrowSrc);
  loader.register(escrowSrc.EscrowWithdrawal);
  loader.register(limitOrderProtocol.AuctionWinner);
  loader.register(limitOrderProtocol.MakerTraits);
  loader.register(limitOrderProtocol.Order);
  loader.register(limitOrderProtocol.OrderCap);
  loader.register(limitOrderProtocol.ProtocolCap);
  loader.register(timelocks.Timelock);
}
