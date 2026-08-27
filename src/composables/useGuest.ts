import { ref, onMounted } from 'vue'
import type { GuestInfo } from '../types/wedding'

export function useGuest() {
  const guest = ref<GuestInfo>({
    name: 'Honored Guest',
    seats: 2,
    table: 'Table 4',
    personalizedMessage: 'We would be deeply honored by your presence on our special day.',
    isVip: false,
  })

  const hasCustomGuest = ref(false)
  const isEnvelopeOpen = ref(false)

  const parseGuestFromUrl = async () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const idParam = params.get('id')

    // ID-based lookup from JSON
    if (idParam && idParam.trim() !== '') {
      try {
        const res = await fetch('/data/Daftar_Undangan_Baong.json')
        const list: Array<{ No: number; 'Nama Undangan': string; ID: string }> = await res.json()
        const found = list.find(g => g.ID.toUpperCase() === idParam.toUpperCase())
        if (found) {
          hasCustomGuest.value = true
          guest.value.name = found['Nama Undangan'].trim()
          return
        }
      } catch (e) {
        console.warn('Failed to load guest list:', e)
      }
    }

    // Fallback: name-based params (legacy support)
    const nameParam = params.get('to') || params.get('guest') || params.get('name') || params.get('p') || params.get('u')
    const seatsParam = params.get('seats') || params.get('pax') || params.get('qty')
    const tableParam = params.get('table')
    const vipParam = params.get('vip')

    if (nameParam && nameParam.trim() !== '') {
      hasCustomGuest.value = true
      const cleanName = decodeURIComponent(nameParam.replace(/\+/g, ' ')).trim()
      guest.value.name = cleanName
    }

    if (seatsParam && !isNaN(parseInt(seatsParam, 10))) {
      guest.value.seats = Math.max(1, parseInt(seatsParam, 10))
    }

    if (tableParam) {
      guest.value.table = decodeURIComponent(tableParam.replace(/\+/g, ' ')).trim()
    }

    if (vipParam === '1' || vipParam === 'true') {
      guest.value.isVip = true
    }
  }

  const openEnvelope = () => {
    isEnvelopeOpen.value = true
  }

  const closeEnvelope = () => {
    isEnvelopeOpen.value = false
  }

  onMounted(async () => {
    await parseGuestFromUrl()
    // Auto-open invitation envelope on landing if guest specified
    if (hasCustomGuest.value) {
      isEnvelopeOpen.value = true
    }
  })

  return {
    guest,
    hasCustomGuest,
    isEnvelopeOpen,
    openEnvelope,
    closeEnvelope,
  }
}
