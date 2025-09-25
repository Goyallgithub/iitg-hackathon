import { Users, Crown, Building, Cpu, Smartphone, Zap } from 'lucide-react'

const teamMembers = [
  {
    name: "Siya Kumari",
    title: "Talking Tom, Pagal Aurat",
    icon: Users,
    description: "Communication specialist and creative problem solver",
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "Bhavya Goyal",
    title: "The Great King",
    icon: Crown,
    description: "Project lead and strategic visionary",
    color: "from-yellow-500 to-orange-500"
  },
  {
    name: "Madhav Bhati",
    title: "The Architect",
    icon: Building,
    description: "System design and infrastructure expert",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Ratan",
    title: "Robotic Enthusiast",
    icon: Cpu,
    description: "Hardware and automation specialist",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Naman Jain",
    title: "The App Dev",
    icon: Smartphone,
    description: "Mobile and web application developer",
    color: "from-purple-500 to-violet-500"
  },
  {
    name: "Nandani Chauhan",
    title: "Choti Packet Bada Dhamaka",
    icon: Zap,
    description: "Power-packed performance optimizer",
    color: "from-red-500 to-pink-500"
  }
]

import { Infinity as InfinityIcon, Sparkles } from 'lucide-react'

export default function OurTeam() {
  const members = [
    { name: 'Siya Kumari', role: 'The talking tom, Comics Queen' },
    { name: 'Bhavya Goyal', role: 'Genius' },
    { name: 'Ratan', role: 'The Arduino Rockstar' },
    { name: 'Nandani', role: 'The supergirl, chota Packet Bada Dhamaka' },
    { name: 'Madhav Bhati', role: 'The Architect' },
    { name: 'Naman jain', role: 'App developer' },
  ]
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <div className="text-2xl font-semibold tracking-tight">Our Team</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">A multidisciplinary crew crafting SolarSiphon with passion and precision.</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/70 dark:bg-mining-card p-4 flex items-center justify-center">
        <img src="/sihwebimg.png" alt="SolarSiphon Team" className="w-full max-w-md rounded-xl border border-white/10 shadow-soft object-cover" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {members.map((m, i) => (
          <div key={i} className="rounded-xl p-4 bg-white dark:bg-mining-card border border-white/10 hover:shadow-glow transition">
            <div className="flex items-center justify-between">
              <div className="font-medium tracking-tight">{m.name}</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">SolarSiphon</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.role}</div>
          </div>
        ))}
      </div>

      {/* Bottom achievement bar */}
      <div className="mt-6 rounded-2xl p-4 border border-white/10 bg-gradient-to-r from-neon-violet/10 via-white/40 to-neon-cyan/10 dark:from-neon-violet/10 dark:via-transparent dark:to-neon-cyan/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/70 dark:bg-white/10 border border-white/20">
              <InfinityIcon className="text-neon-cyan" size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">Innovation: Infinity</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Always iterating, always improving</div>
            </div>
          </div>
          <div className="flex-1 md:max-w-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Dedication</span>
              <span className="font-medium">100%</span>
            </div>
            <div className="h-2 mt-2 rounded-full bg-white/30 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-neon-violet to-neon-cyan" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

