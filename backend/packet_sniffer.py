from scapy.all import sniff
from scapy.layers.inet import IP

from ai_detector import detect_threat

captured_packets = []

def process_packet(packet):

    if packet.haslayer(IP):

        packet_size = len(packet)

        threat_status = detect_threat(packet_size)

        packet_data = {
            "source_ip": packet[IP].src,
            "destination_ip": packet[IP].dst,
            "packet_size": packet_size,
            "status": threat_status
        }

        captured_packets.append(packet_data)

        print(packet_data)

sniff(filter="ip", prn=process_packet, store=False)